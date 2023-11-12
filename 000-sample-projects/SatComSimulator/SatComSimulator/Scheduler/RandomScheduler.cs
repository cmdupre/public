using System;
using System.Collections.Generic;
using SatComSimulator.Scenario;

namespace SatComSimulator.Scheduler
{
    internal class RandomScheduler : BaseScheduler
    {
        private readonly int m_RotationIntervalMs;
        private readonly Random m_Random;
        private DateTimeOffset m_StartTime;

        internal RandomScheduler(List<BaseScenario> scenarios, int rotationIntervalMs)
            : base(scenarios)
        {
            m_RotationIntervalMs = rotationIntervalMs;
            m_Random = new Random(DateTimeOffset.Now.Millisecond);
            m_StartTime = DateTimeOffset.MinValue;
        }

        /// <inheritdoc />
        protected override BaseScenario TryRotate(BaseScenario currentScenario)
        {
            TimeSpan runTime = DateTimeOffset.Now - m_StartTime;

            if (runTime.TotalMilliseconds < m_RotationIntervalMs)
            {
                return currentScenario;
            }

            int index = m_Random.Next(0, Scenarios.Count);

            m_StartTime = DateTimeOffset.Now;

            Console.WriteLine($"Assigned new scenario, index {index}.");

            return Scenarios[index];
        }
    }
}