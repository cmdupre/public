using System;
using System.Net;
using System.Net.Sockets;

namespace SatComSimulator.Socket
{
    internal sealed class SatComTcpSocket : ISatComSocket
    {
        private System.Net.Sockets.Socket m_Socket;

        /// <inheritdoc />
        public byte[] Buffer { get; private set; }

        /// <inheritdoc />
        public bool Connected => m_Socket.Connected;

        internal SatComTcpSocket()
        {
            Buffer = Array.Empty<byte>();

            m_Socket = new System.Net.Sockets.Socket(SocketType.Stream, ProtocolType.Tcp);
        }

        /// <inheritdoc />
        public void Dispose()
        {
            m_Socket?.Dispose();
        }

        /// <inheritdoc />
        public int Send(byte[] buffer)
        {
            int sendCount = m_Socket.Send(buffer, buffer.Length, SocketFlags.None);

            if (sendCount != buffer.Length)
            {
                throw new InvalidOperationException(Properties.Resources.InvalidSendCount);
            }

            Buffer = Array.Empty<byte>();

            return sendCount;
        }

        /// <inheritdoc />
        public int Send(byte buffer)
        {
            return Send(new byte[] { buffer });
        }

        /// <inheritdoc />
        public int Receive(byte[] buffer)
        {
            int receiveCount = m_Socket.Receive(buffer, buffer.Length, SocketFlags.None);

            if (receiveCount != buffer.Length)
            {
                throw new InvalidOperationException(Properties.Resources.InvalidReceiveCount);
            }

            Buffer = buffer;

            return receiveCount;
        }

        /// <inheritdoc />
        public void Connect(IPEndPoint ipEndPoint)
        {
            m_Socket.Connect(ipEndPoint);
        }

        /// <inheritdoc />
        public void Bind(IPEndPoint ipEndPoint)
        {
            m_Socket.Bind(ipEndPoint);
        }

        /// <inheritdoc />
        public void Listen()
        {
            m_Socket.Listen(0);
        }

        /// <inheritdoc />
        public ISatComSocket Accept()
        {
            m_Socket = m_Socket.Accept();

            return this;
        }
    }
}
