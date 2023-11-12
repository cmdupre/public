using System.Collections.Generic;
using NUnit.Framework;
using SatComSimulator.Scenario;
using SatComSimulator.Scheduler;
using SatComSimulator.Settings;
using SatComSimulator.Socket;

namespace SatComSimulator.Engine.NUnit
{
    [TestFixture]
    internal static class AutoSimulatorFixture
    {
        [Test, Explicit]
        public static void TestSimulatorRun()
        {
            var settings = ServerSettings.Default;

            using (ISatComSocket recvClient = new SatComTcpSocket())
            using (ISatComSocket sendClient = new SatComTcpSocket())
            {
                var server = new Server(settings, recvClient, sendClient);

                server.AcceptClients();

                var eastScenarios = new List<BaseScenario> 
                {
                    new ScenarioOne(server), 
                    new ScenarioTwo(server, 500) 
                };

                var westScenarios = new List<BaseScenario> 
                { 
                    new ScenarioOne(server.WithReversedClients), 
                    new ScenarioTwo(server.WithReversedClients, 500) 
                };

                using (var eastScheduler = new LinearScheduler(eastScenarios, 3000))
                using (var westScheduler = new LinearScheduler(westScenarios, 3000))
                {
                    AutoSimulator.Run(eastScheduler, westScheduler);
                }
            }
        }
    }
}
