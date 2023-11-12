using System;
using System.Windows.Input;

namespace SatComSimulator.UI.ViewModels
{
    internal sealed class Command : ICommand
    {
        private readonly Action<object> m_Execute;
        private readonly Func<bool> m_CanExecute;

        internal Command(Action<object> execute, Func<bool> canExecute = null)
        {
            m_Execute = execute;
            m_CanExecute = canExecute;
        }

        public event EventHandler CanExecuteChanged
        {
            add => CommandManager.RequerySuggested += value;
            remove => CommandManager.RequerySuggested -= value;
        }

        public bool CanExecute(object parameter)
        {
            return m_CanExecute is null || m_CanExecute();
        }

        public void Execute(object parameter)
        {
            m_Execute(parameter);
        }
    }
}
