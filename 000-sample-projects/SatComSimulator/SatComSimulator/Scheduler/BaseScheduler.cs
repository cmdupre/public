using System;
using System.Collections.Generic;
using System.Linq;
using SatComSimulator.Scenario;

namespace SatComSimulator.Scheduler
{
    internal abstract class BaseScheduler : IDisposable
    {
        private BaseScenario m_ActiveScenario;

        internal BaseScheduler(List<BaseScenario> scenarios)
        {
            Scenarios = scenarios;
            m_ActiveScenario = Scenarios.FirstOrDefault();
        }

        internal List<BaseScenario> Scenarios { get; }

        internal BaseScenario ActiveScenario
        {
            get
            {
                if (m_ActiveScenario.CanRotate)
                {
                    m_ActiveScenario = TryRotate(m_ActiveScenario);
                }

                return m_ActiveScenario;
            }
        }

        protected abstract BaseScenario TryRotate(BaseScenario currentScenario);

        /// <inheritdoc />
        public virtual void Dispose()
        {
            m_ActiveScenario?.Dispose();

            foreach (var scenario in Scenarios)
            {
                scenario.Dispose();
            }
        }
    }
}
