using JetBrains.Annotations;
using NUnit.Framework;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class ExtensionsFixture
    {
        [Test]
        public void FindsIndexInStringForPointCsvParser()
        {
            const string test = "easting";

            Assert.IsTrue(test.Contains(PointCsvParser.Index.Easting));
        }

        [TestCase("~!@#$%^&*()_-+={}[]|\\/<>;:'\",.?Aa1 ", "-,.aa1")]
        public void SanitizesInputLine([NotNull] string input, [NotNull] string expected)
        {
            string result = input.Sanitize();

            Assert.AreEqual(expected, result);
        }

        [TestCase(0.0000000000001, true)]
        [TestCase(0.000000000001, false)]
        [TestCase(-0.0000000000001, true)]
        [TestCase(-0.000000000001, false)]
        public void CorrectlyIdentifiesAlmostZero(double value, bool expected)
        {
            Assert.AreEqual(expected, (value).IsAlmostZero());
        }
    }
}
