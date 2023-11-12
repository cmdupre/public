using NUnit.Framework;
using System.Windows;

namespace StationOffsetCalculator.NUnit
{
    [TestFixture]
    internal sealed class LineIntersectionFixture
    { 
        [Test]
        public void LineIntersectionIsOnSegment()
        {
            var point1 = new Point(0, 0);
            var point2 = new Point(10, 10);
            var point3 = new Point(4, 5);

            var lineIntersection = new LineIntersection(point1, point2, point3);

            Assert.IsTrue(lineIntersection.IsOnSegment);
        }

        [Test]
        public void LineIntersectionIsNotOnSegment()
        {
            var point1 = new Point(0, 0);
            var point2 = new Point(10, 10);
            var point3 = new Point(4, 20);

            var lineIntersection = new LineIntersection(point1, point2, point3);

            Assert.IsTrue(lineIntersection.IsNotOnSegment);
        }
    }
}
