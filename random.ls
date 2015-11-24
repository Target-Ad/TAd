js = require \jsclass
emum = require \jsclass/src/enumerable .Enumerable
linklist = require \jsclass/src/linked_list .LinkedList
listA = new linklist.Doubly
a= [{i:0}, {i:1}, {i:2}]
for i of a
	listA.push a[i]
