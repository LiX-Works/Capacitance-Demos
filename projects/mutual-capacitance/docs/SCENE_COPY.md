# Mutual-Capacitance Lab / current scene text

Exported from the built scene definitions of the 2026-10-25 English presentation edition. The original Chinese upload remains unchanged in the reference archive.

## 00 / Unfold two plates. What remains?

Facing-area model: zero at 90°
 Full solution: fringe coupling survives

Facing · 0° 23.37 pF Side by side · 180° 3.07 pF Still there 13 %

> Air · simulated, not measured

## 01 / One hinge, pure rotation

One fixed plate, one rotating plate
 Pivot: H = (−δ, D/2)
 Coplanar gap: g = 2δ = 2 mm

\[
\mathbf p_\theta=\mathbf H+R(\theta)(\mathbf p_0-\mathbf H)
\]

> Full dimensions and parameters: Methods

## 02 / Small angles: thin slices

Thin parallel strips
 Growing gap: h(x) = h₀ + x tanθ
 Misses edge fields: 9% low at 0°

\[
C_{\rm strip}=\varepsilon b\int_0^W\!\frac{dx}{h_0+x\tan\theta}
\]

## 03 / Ideal sector: field lines as arcs

Two radial conductors, angle α
 Equipotentials = rays · field lines = arcs
 Strongest at the apex: | E | ∝ 1/ r

\[
C_{\rm sector}=\frac{\varepsilon b}{\alpha}\ln\frac{r_1}{r_0}
\]

> α = 60° · r₀ = 5 mm · r₁ = 30 mm

## 04 / Real plates, open space

Boundary element method
 Surface charge in open space
 No artificial boundary box

\[
C_{\rm 2D}=b\,\frac{Q'}{\Delta V}
\]

> Computed field · 2-D solution scaled by width

## 05 / Where shortcuts break

Shortcuts: zero at 90°
 Full solution: nonzero beyond 90°
 3.07 pF at 180°

\[
e_{\rm model}=\frac{C_{\rm approx}-C_{\rm 2D}}{C_{\rm 2D}}
\]

## 06 / Can the numbers be trusted?



Panels
 FVM +0.01% · +1.3%
 3-D +1.2% · +6.7% · +7.6%
 Thin strip 3.00 vs 3.07 pF

> FVM: 0°, 180° · 3-D: 0°, 90°, 180°. Numerical checks.

## 07 / What survives the unfolding



13 % survives side by side
3.07 pF of fringe coupling 90 ° the strip model reaches zero
approximations have limits 4 checks independent numerical checks
simulation, not measurement See fringe sensing: ProxiTouch →
