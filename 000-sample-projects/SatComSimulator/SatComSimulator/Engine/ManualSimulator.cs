using System;
using System.Threading.Tasks;
using SatComSimulator.Scenario;

namespace SatComSimulator.Engine
{
    internal static class ManualSimulator
    {
        private static BaseScenario s_EastScenario;
        private static BaseScenario s_WestScenario;
        private static bool s_Running;

        internal static BaseScenario EastScenario => s_EastScenario;
        internal static BaseScenario WestScenario => s_WestScenario;

        internal static void Run(BaseScenario eastScenario, BaseScenario westScenario)
        {
            if (s_Running)
            {
                return;
            }

            s_Running = true;

            s_EastScenario = eastScenario;
            s_WestScenario = westScenario;

            Task.Run(() => Handler(ref s_EastScenario));
            Task.Run(() => Handler(ref s_WestScenario));
        }

        internal static void DisposeAndUpdateScenarios(BaseScenario eastScenario, BaseScenario westScenario)
        {
            Task.Run(() => UpdateScenario(ref s_EastScenario, eastScenario));
            Task.Run(() => UpdateScenario(ref s_WestScenario, westScenario));
        }

        private static void UpdateScenario(ref BaseScenario scenario, BaseScenario newScenario)
        {
            while (!scenario.CanRotate)
            {
                System.Threading.Thread.Sleep(10);
            }

            scenario.Dispose();
            scenario = newScenario;
        }

        private static void Handler(ref BaseScenario scenario)
        {
            while (true)
            {
                try
                {
                    var buffer = new byte[1];

                    int receiveCount = scenario.Server.RecvClient.Receive(buffer);

                    if (receiveCount != buffer.Length)
                    {
                        throw new InvalidOperationException(Properties.Resources.InvalidReceiveCount);
                    }

                    scenario.BufferAndSend(buffer);
                }
                catch (InvalidOperationException)
                {
                    break;
                }
            }
        }
    }
}