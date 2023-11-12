using NUnit.Framework;
using SatComSimulator.Scenario;
using SatComSimulator.Settings;
using SatComSimulator.Socket;

namespace SatComSimulator.Engine.NUnit
{
    [TestFixture]
    internal static class ManualSimulatorFixture
    {
        [Test]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "<Pending>")]
        public static void TestScenariosAreUpdated()
        {
            using (var testSocket = new SatComTcpSocket())
            {
                var server = new Server(ServerSettings.Default, testSocket, testSocket);

                using (var eastScenario = new TestScenario(server, 0, true))
                using (var westScenario = new TestScenario(server, 0, true))
                {
                    Assert.That(ManualSimulator.EastScenario, Is.Null);
                    Assert.That(ManualSimulator.WestScenario, Is.Null);

                    ManualSimulator.Run(eastScenario, westScenario);

                    Assert.That(ManualSimulator.EastScenario, Is.SameAs(eastScenario), "EastScenario not set.");
                    Assert.That(ManualSimulator.WestScenario, Is.SameAs(westScenario), "WestScenario not set.");

                    using (var newEastScenario = new TestScenario(server, 0, true))
                    using (var newWestScenario = new TestScenario(server, 0, true))
                    {
                        ManualSimulator.DisposeAndUpdateScenarios(newEastScenario, newWestScenario);

                        System.Threading.Thread.Sleep(10);

                        Assert.That(ManualSimulator.EastScenario, Is.SameAs(newEastScenario), "EastScenario not updated.");
                        Assert.That(ManualSimulator.WestScenario, Is.SameAs(newWestScenario), "WestScenario not updated.");
                    }
                }
            }
        }
    }
}
