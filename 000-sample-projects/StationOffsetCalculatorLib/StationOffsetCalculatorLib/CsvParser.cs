using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.IO;

namespace StationOffsetCalculator
{
    public class CsvParser : IDisposable
    {
        [CanBeNull] public StreamReader File { get; }

        public CsvParser([NotNull] string filename)
        {
            try
            {
                File = new StreamReader(filename);
            }
            catch (Exception e)
            {
                ErrorMessage = e.Message;
            }
        }

        public virtual void Dispose()
        {
            File?.Dispose();
        }

        public bool IsOpen => File != null;

        [NotNull] public string ErrorMessage { get; } = string.Empty;

        /// <summary>
        /// Indices to point to correct columns in CSV file for desired data.
        /// </summary>
        [NotNull] public List<int> Indices { get; set; } = new List<int>();
    }
}
