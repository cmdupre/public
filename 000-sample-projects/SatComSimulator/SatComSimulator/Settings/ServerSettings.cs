namespace SatComSimulator.Settings
{
    internal sealed class ServerSettings
    {
        internal int Port1 { get; }
        internal int Port2 { get; }

        internal static ServerSettings Default => new ServerSettings(8888, 9999);

        private ServerSettings(int port1, int port2)
        {
            Port1 = port1;
            Port2 = port2;
        }
    }
}