using NUnit.Framework;

namespace SatComSimulator.Settings.NUnit
{
    [TestFixture]
    internal static class ServerSettingsFixture
    {
        [Test]
        public static void GetDefaultSettings()
        {
            var settings = ServerSettings.Default;

            Assert.That(settings.Port1, Is.EqualTo(8888));
            Assert.That(settings.Port2, Is.EqualTo(9999));
        }
    }
}