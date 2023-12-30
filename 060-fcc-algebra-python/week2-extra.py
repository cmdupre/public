import sympy
from sympy import *

x = symbols('x')

eq = x**3 - 2*x**2 - 5*x + 6

print(sympy.factor(eq))