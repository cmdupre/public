using System.Timers;
using SatComSimulator.Engine;

namespace SatComSimulator.Scenario
{
    /// <summary>
    /// Pass-through, no processing.
    /// </summary>
    internal sealed class ScenarioOne : BaseScenario
    {
        /// <inheritdoc />
        internal ScenarioOne(Server server, int timerIntervalMs = 0) : base(server, timerIntervalMs)
        {
        }

        /// <inheritdoc />
        protected override void ProcessTimer(object sender, ElapsedEventArgs e)
        {
            throw new System.NotImplementedException();
        }

        /// <inheritdoc />
        protected override void Process()
        {
            Send();
        }
    }
}
