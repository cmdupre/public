using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Timers;
using SatComSimulator.Engine;

namespace SatComSimulator.Scenario
{
    internal abstract class BaseScenario : IDisposable
    {
        protected List<byte> Bytes { get; }

        internal Server Server { get; }

        private readonly object m_Locker;
        private readonly Timer m_Timer;

        internal BaseScenario(Server server, int timerIntervalMs = 0)
        {
            Server = server;
            m_Locker = new object();
            Bytes = new List<byte>();

            if (timerIntervalMs <= 0)
            {
                return;
            }

            m_Timer = new Timer
            {
                Interval = timerIntervalMs,
                Enabled = true
            };

            m_Timer.Elapsed += TimerElapsed;
            m_Timer.Start();
        }

        internal bool CanRotate
        {
            get
            {
                lock (m_Locker)
                {
                    return Bytes.Count == 0;
                }
            }
        }

        private void TimerElapsed(object sender, ElapsedEventArgs e)
        {
            lock (m_Locker)
            {
                ProcessTimer(sender, e);
            }
        }

        protected abstract void ProcessTimer(object sender, ElapsedEventArgs e);

        internal void BufferAndSend(byte[] buffer)
        {
            lock (m_Locker)
            {
                Bytes.AddRange(buffer);

                Process();
            }
        }

        protected abstract void Process();

        protected void Send(int byteDelayMs = 0)
        {
            int count = 0;

            try
            {
                if (byteDelayMs == 0)
                {
                    count = Server.SendClient.Send(Bytes.ToArray());
                }
                else
                {
                    Bytes.ForEach(b => 
                    {
                        System.Threading.Thread.Sleep(byteDelayMs);
                        count += Server.SendClient.Send(b);
                    });
                }
            }
            catch (SocketException)
            {
                count = -1;
            }

            if (count != Bytes.Count)
            {
                Console.WriteLine(Properties.Resources.ClearWarning);
            }

            Bytes.Clear();
        }

        /// <inheritdoc />
        public virtual void Dispose()
        {
            if (m_Timer == null)
            {
                return;
            }

            m_Timer.Enabled = false;
            m_Timer.Stop();
            m_Timer.Dispose();
        }
    }
}
