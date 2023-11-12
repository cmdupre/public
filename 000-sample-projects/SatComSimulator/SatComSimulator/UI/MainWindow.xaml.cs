using System.Windows;
using SatComSimulator.Engine;
using SatComSimulator.Scenario;
using SatComSimulator.Settings;
using SatComSimulator.Socket;
using SatComSimulator.UI.ViewModels;

namespace SatComSimulator.UI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        private readonly MainWindowViewModel m_MainWindowViewModel;

        public MainWindow()
        {
            InitializeComponent();

            m_MainWindowViewModel = new MainWindowViewModel();

            DataContext = m_MainWindowViewModel;
        }
    }
}
