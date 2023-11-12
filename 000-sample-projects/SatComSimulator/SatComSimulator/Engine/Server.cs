using System.Net;
using SatComSimulator.Settings;
using SatComSimulator.Socket;

namespace SatComSimulator.Engine
{
    internal sealed class Server
    {
        private readonly ServerSettings m_Settings;

        public ISatComSocket RecvClient { get; private set; }
        public ISatComSocket SendClient { get; private set; }

        internal Server WithReversedClients => new Server(m_Settings, SendClient, RecvClient);

        internal Server(ServerSettings settings, ISatComSocket recvClient, ISatComSocket sendClient)
        {
            m_Settings = settings;

            RecvClient = recvClient;
            SendClient = sendClient;
        }

        internal void AcceptClients()
        {
            RecvClient = Accept(RecvClient, m_Settings.Port1);
            SendClient = Accept(SendClient, m_Settings.Port2);
        }

        private static ISatComSocket Accept(ISatComSocket client, int port)
        {
            var ipEndPoint = new IPEndPoint(IPAddress.Any, port);

            client.Bind(ipEndPoint);

            client.Listen();

            return client.Accept();
        }
    }
}