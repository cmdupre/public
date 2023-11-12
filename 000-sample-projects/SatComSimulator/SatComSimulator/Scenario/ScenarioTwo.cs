using System.Timers;
using SatComSimulator.Engine;

namespace SatComSimulator.Scenario
{
    /// <summary>
    /// Constant delay, each byte.
    /// </summary>
    internal sealed class ScenarioTwo : BaseScenario
    {
        /// <inheritdoc />
        internal ScenarioTwo(Server server, int timerIntervalMs = 0) : base(server, timerIntervalMs)
        {
        }

        /// <inheritdoc />
        protected override void ProcessTimer(object sender, ElapsedEventArgs e)
        {
            Send();
        }

        /// <inheritdoc />
        protected override void Process()
        {
        }
    }
}
