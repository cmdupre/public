using System.Net;
using System.Threading.Tasks;
using NUnit.Framework;
using SatComSimulator.Settings;
using SatComSimulator.Socket;

namespace SatComSimulator.Engine.NUnit
{
    [TestFixture]
    internal static class ServerFixture
    {
        private static ServerSettings m_Settings;
        private static Server m_Server;
        private static ISatComSocket m_RecvClient;
        private static ISatComSocket m_SendClient;

        [SetUp]
        public static void SetUp()
        {
            m_RecvClient = new SatComTcpSocket();
            m_SendClient = new SatComTcpSocket();

            m_Settings = ServerSettings.Default;

            m_Server = new Server(m_Settings, m_RecvClient, m_SendClient);

            Task.Run(() => m_Server.AcceptClients());
        }

        [TearDown]
        public static void Teardown()
        {
            m_RecvClient.Dispose();
            m_SendClient.Dispose();
        }

        [Test]
        public static void CanAcceptClients()
        {
            ISatComSocket client1;
            ISatComSocket client2;

            var ipEndPoint1 = new IPEndPoint(IPAddress.Loopback, m_Settings.Port1);
            var ipEndPoint2 = new IPEndPoint(IPAddress.Loopback, m_Settings.Port2);

            using (client1 = new SatComTcpSocket())
            using (client2 = new SatComTcpSocket())
            {
                client1.Connect(ipEndPoint1);
                client2.Connect(ipEndPoint2);

                Assert.That(client1.Connected, Is.EqualTo(true));
                Assert.That(client2.Connected, Is.EqualTo(true));
            }

            Assert.That(client1.Connected, Is.EqualTo(false));
            Assert.That(client2.Connected, Is.EqualTo(false));

            using (client1 = new SatComTcpSocket())
            using (client2 = new SatComTcpSocket())
            {
                client1.Connect(ipEndPoint1);
                client2.Connect(ipEndPoint2);

                Assert.That(client1.Connected, Is.EqualTo(true));
                Assert.That(client2.Connected, Is.EqualTo(true));
            }
        }

        [Test]
        public static void TestReversedClients()
        {
            Server reverse = m_Server.WithReversedClients;

            Assert.That(reverse, Is.Not.SameAs(m_Server));
            Assert.That(reverse.RecvClient, Is.SameAs(m_Server.SendClient));
            Assert.That(reverse.RecvClient, Is.Not.SameAs(m_Server.RecvClient));
        }
    }
}