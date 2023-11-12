using System;
using System.Collections.Generic;
using SatComSimulator.Scenario;

namespace SatComSimulator.Scheduler
{
    internal class LinearScheduler : BaseScheduler
    {
        private readonly int m_RotationIntervalMs;
        private int m_Index;
        private DateTimeOffset m_StartTime;

        internal LinearScheduler(List<BaseScenario> scenarios, int rotationIntervalMs)
            : base(scenarios)
        {
            m_RotationIntervalMs = rotationIntervalMs;
            m_StartTime = DateTimeOffset.Now;
            m_Index = 0;
        }

        /// <inheritdoc />
        protected override BaseScenario TryRotate(BaseScenario currentScenario)
        {
            TimeSpan runTime = DateTimeOffset.Now - m_StartTime;

            if (runTime.TotalMilliseconds < m_RotationIntervalMs)
            {
                return currentScenario;
            }

            m_Index++;

            if (m_Index >= Scenarios.Count)
            {
                m_Index = 0;
            }

            m_StartTime = DateTimeOffset.Now;

            Console.WriteLine($"Assigned new scenario, m_Index {m_Index}.");

            return Scenarios[m_Index];
        }
    }
}