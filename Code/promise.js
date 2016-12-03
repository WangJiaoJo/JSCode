console.log("Start");

let itemSet = () => {
	let itemCount = 1;
	
	let items = [
		{id: itemCount++, item: "Sword of Truth"},
		{id: itemCount++, item: "Bool of Wisdom"},
		{id: itemCount++, item: "Potion of Healing"},
	];
	
	return {
		addItem: (item) => {
			return new Promise((fulfill, reject) => {
				if (!item) reject("You did not provide an item");
				
				fulfill(items.push({id: itemCount++, item: item}));
			});
		},
		getItem: () => {
			return new Promise((fulfill, reject) => {
				setTimeout(() => {
					if (items.length > 0) fulfill(items.shift());
					reject("No items left!");
				}, 750);
			});
		}
	}
}

let firstItemSet = itemSet();

/*
firstItemSet.getItem()
	.then((firstItem) => {
		console.log("You got a new item!");
		console.log(firstItem);
		//return firstItemSet.getItem();
		throw "No";
	})
	.then((secondItem) => {
		console.log("You got a second item!");
		console.log(secondItem);
		return secondItem;
	})
	.then(lastItemReceived => {
		console.log("the last item recieved was:");
		console.log(lastItemReceived);
	})
	.catch((error) => {
		console.error("an error occured");
		console.error(error);
		return "We've survived the error";
	}).then((message) => {
		console.log(message);
	})
*/

let firstChain = firstItemSet.getItem().then((firstItem) => {
	console.log("You got a new item!");
	console.log(firstItem);
	
	return firstItemSet.getItem().then((secondItem) => {
		console.log("You got a new item!");
		console.log(secondItem);
		
		return firstItemSet.getItem().then((thirdItem) => {
			console.log("You got a new item!");
			console.log(thirdItem);
			
			return firstItemSet.getItem().then((fourthItem) => {
				return [firstItem, secondItem, thirdItem, fourthItem];
			}).catch(() => {
				console.log("There was no fourth item!");
				return [firstItem, secondItem, thirdItem];
			});
		});
	});
}).then((items) => {
	console.log("all the items were:");
	console.log(items); 
	return items;
}, (error) => {
	console.log("There was am error:");
	console.log(error);
	
	return[];
});


let secondItemSet = itemSet();

let secondChain = firstChain.then(() => {
	console.log("\n\n\nStarting second chain");
	return secondItemSet.getItem.then((firstItem) => {
		return [firstItem];
	});
}).then((itemsSoFar) => {
	return secondItemSet.getItem().then((secondItem) => { 
		return itemsSoFar.concat([secondItem]);
	});
}).then((itemsSoFar) => {
	return secondItemSet.getItem().then((thirdItem) => {
		return itemsSoFar.concat([thirdItem]);
	});
}).then((items) => {
	console.log("all the items in chain 2 were:");
	console.log(items);
	return items.then((itemsSoFar) => {
	return secondItemSet.getItem().then((secondItem) => {
		return itemsSoFar.concat([secondItem]);
	});
});
});
