using System;
using System.Net;

namespace SatComSimulator.Socket
{
    internal interface ISatComSocket : IDisposable
    {
        byte[] Buffer { get; }

        int Send(byte[] buffer);

        int Send(byte buffer);

        int Receive(byte[] buffer);

        void Connect(IPEndPoint ipEndPoint);

        bool Connected { get; }

        void Bind(IPEndPoint ipEndPoint);

        void Listen();

        ISatComSocket Accept();
    }
}
