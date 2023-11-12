using NUnit.Framework;
using SatComSimulator.Engine;
using SatComSimulator.Settings;
using SatComSimulator.Socket;

namespace SatComSimulator.Scenario.NUnit
{
    [TestFixture]
    internal static class BaseScenarioFixture
    {
        [Test]
        public static void CannotRotateWithPendingTransmission()
        {
            using (ISatComSocket recvClient = new SatComTcpSocket())
            using (ISatComSocket sendClient = new SatComTcpSocket())
            {
                var server = new Server(ServerSettings.Default, recvClient, sendClient);

                using (var scenario = new TestScenario(server, 0, false))
                {
                    scenario.BufferAndSend(new byte[] { 1 });

                    Assert.That(scenario.CanRotate, Is.EqualTo(false));
                }
            }
        }

        [Test]
        public static void CanRotateWithoutPendingTransmission()
        {
            using (ISatComSocket recvClient = new SatComTcpSocket())
            using (ISatComSocket sendClient = new SatComTcpSocket())
            {
                var server = new Server(ServerSettings.Default, recvClient, sendClient);

                using (var scenario = new TestScenario(server, 0, true))
                {
                    scenario.BufferAndSend(new byte[] { 1 });

                    Assert.That(scenario.CanRotate, Is.EqualTo(true));
                }
            }
        }
    }
}
