ar = []
for i from 0 to 6 by 1
	ar[i] =i
ar.sort ->
	Math.random!-0.5
for j from 0 to ar.length by 1
	console.log ar.pop!
