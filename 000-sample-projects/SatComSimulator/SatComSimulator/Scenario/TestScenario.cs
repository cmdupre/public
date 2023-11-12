using System.Timers;
using SatComSimulator.Engine;

namespace SatComSimulator.Scenario
{
    internal sealed class TestScenario : BaseScenario
    {
        private readonly bool m_WithSend;

        internal TestScenario(Server server, int timerIntervalMs, bool withSend)
            : base(server, timerIntervalMs)
        {
            m_WithSend = withSend;
        }

        /// <inheritdoc />
        protected override void ProcessTimer(object sender, ElapsedEventArgs e)
        {
        }

        /// <inheritdoc />
        protected override void Process()
        {
            if (m_WithSend)
            {
                Send();
            }
        }
    }
}
