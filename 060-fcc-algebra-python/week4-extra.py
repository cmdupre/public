import matplotlib.pyplot as plt
import numpy as np

xmin = -10
xmax = 10
ymin = -10
ymax = 10
points = 2*(xmax-xmin)
x = np.linspace(xmin, xmax, points)
y = 2*x + 1

fig, ax = plt.subplots()
ax.set_xlabel('x values')
ax.set_ylabel('y values')
ax.set_title('Some Graph')
ax.grid(True)
ax.set_xticks(np.arange(xmin, xmax, 2))
ax.set_yticks(np.arange(ymin, ymax, 2))

plt.axis([xmin,xmax,ymin,ymax])
plt.plot([xmin,xmax], [0,0], 'k')
plt.plot([0,0], [ymin,ymax], 'k')
plt.plot(x, y, label='line')
plt.legend()
plt.show()