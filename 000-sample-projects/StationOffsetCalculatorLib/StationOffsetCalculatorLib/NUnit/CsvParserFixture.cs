using NUnit.Framework;
using System;
using System.IO;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class CsvParserFixture
    {
        private static readonly string s_TestPath = Environment.CurrentDirectory;

        [Test]
        public void CanOpenFileSuccessfully()
        {
            bool isOpen;
            string errorMessage;
            string testFile = Path.Combine(s_TestPath, "nunit_test.csv");

            File.WriteAllText(testFile, string.Empty);

            using (var parser = new CsvParser(testFile))
            {
                isOpen = parser.IsOpen;

                errorMessage = parser.ErrorMessage;
            }

            File.Delete(testFile);

            Assert.IsTrue(isOpen, "File open indicator");
            Assert.AreEqual(string.Empty, errorMessage);
        }

        [Test]
        public void ReceivesErrorMessageOnInvalidFilename()
        {
            bool isOpen;
            string errorMessage;

            using (var parser = new CsvParser(@"c:\testing"))
            {
                isOpen = parser.IsOpen;

                errorMessage = parser.ErrorMessage;
            }

            Assert.IsFalse(isOpen, "File open indicator");
            Assert.AreEqual("Could not find file 'c:\\testing'.", errorMessage);
        }
    }
}
