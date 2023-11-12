using System.Timers;
using SatComSimulator.Engine;

namespace SatComSimulator.Scenario
{
    /// <summary>
    /// Constant delay, each byte.
    /// </summary>
    internal sealed class ScenarioThree : BaseScenario
    {
        readonly int m_ByteDelayMs;

        /// <inheritdoc />
        internal ScenarioThree(Server server, int byteDelayMs, int timerIntervalMs = 0) : base(server, timerIntervalMs)
        {
            m_ByteDelayMs = byteDelayMs;
        }

        /// <inheritdoc />
        protected override void ProcessTimer(object sender, ElapsedEventArgs e)
        {
            Send(m_ByteDelayMs);
        }

        /// <inheritdoc />
        protected override void Process()
        {
        }
    }
}
