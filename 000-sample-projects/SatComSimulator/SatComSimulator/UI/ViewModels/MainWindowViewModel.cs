using SatComSimulator.Engine;
using SatComSimulator.Scenario;
using SatComSimulator.Settings;
using SatComSimulator.Socket;
using System.Windows.Input;

namespace SatComSimulator.UI.ViewModels
{
    internal sealed class MainWindowViewModel
    {
        private readonly Server m_Server;

        internal MainWindowViewModel()
        {
            SatComTcpSocket recvClient = new SatComTcpSocket();
            SatComTcpSocket sendClient = new SatComTcpSocket();

            m_Server = new Server(ServerSettings.Default, recvClient, sendClient);

            ListenCommand = new Command(Listen);
            RunScenarioOneCommand = new Command(RunScenarioOne);
            RunScenarioTwoCommand = new Command(RunScenarioTwo);
            RunScenarioThreeCommand = new Command(RunScenarioThree);
        }

        public ICommand ListenCommand { get; }
        public ICommand RunScenarioOneCommand { get; }
        public ICommand RunScenarioTwoCommand { get; }
        public ICommand RunScenarioThreeCommand { get; }

        private void Listen(object parameter)
        {
            m_Server.AcceptClients();

            using (var eastScenario = new ScenarioOne(m_Server))
            using (var westScenario = new ScenarioOne(m_Server.WithReversedClients))
            {
                ManualSimulator.Run(eastScenario, westScenario);
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Reliability", "CA2000:Dispose objects before losing scope", Justification = "Dipose called in DisposeAndUpdateScenarios")]
        private void RunScenarioOne(object parameter)
        {
            var eastScenario = new ScenarioOne(m_Server);
            var westScenario = new ScenarioOne(m_Server.WithReversedClients);

            ManualSimulator.DisposeAndUpdateScenarios(eastScenario, westScenario);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Reliability", "CA2000:Dispose objects before losing scope", Justification = "Dipose called in DisposeAndUpdateScenarios")]
        private void RunScenarioTwo(object parameter)
        {
            var eastScenario = new ScenarioTwo(m_Server, 1000);
            var westScenario = new ScenarioTwo(m_Server.WithReversedClients, 1000);
         
            ManualSimulator.DisposeAndUpdateScenarios(eastScenario, westScenario);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Reliability", "CA2000:Dispose objects before losing scope", Justification = "Dipose called in DisposeAndUpdateScenarios")]
        private void RunScenarioThree(object parameter)
        {
            var eastScenario = new ScenarioOne(m_Server);
            var westScenario = new ScenarioThree(m_Server.WithReversedClients, 75, 1000);

            ManualSimulator.DisposeAndUpdateScenarios(eastScenario, westScenario);
        }
    }
}
