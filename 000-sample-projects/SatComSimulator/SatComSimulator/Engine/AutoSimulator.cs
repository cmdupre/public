using System;
using System.Threading.Tasks;
using SatComSimulator.Scheduler;

namespace SatComSimulator.Engine
{
    internal static class AutoSimulator
    {
        internal static void Run(BaseScheduler eastTrafficScheduler, BaseScheduler westTrafficScheduler)
        {
            Task t1 = Task.Run(() => Handler(eastTrafficScheduler));
            Task t2 = Task.Run(() => Handler(westTrafficScheduler));

            Task.WaitAny(t1, t2);
        }

        private static void Handler(BaseScheduler scheduler)
        {
            while (true)
            {
                try
                {
                    var buffer = new byte[1];

                    int receiveCount = scheduler.ActiveScenario.Server.RecvClient.Receive(buffer);

                    if (receiveCount != buffer.Length)
                    {
                        throw new InvalidOperationException(Properties.Resources.InvalidReceiveCount);
                    }

                    scheduler.ActiveScenario.BufferAndSend(buffer);
                }
                catch (InvalidOperationException)
                {
                    break;
                }
            }
        }
    }
}
