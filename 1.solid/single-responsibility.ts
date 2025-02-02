// Single Responsibility Principle

import { writeFileSync } from 'node:fs';

// THIS CLASS WILL ONLY HANDLE JOURNAL RELATED OPERATIONS
class Journal {

	entries: Record<string,string> = {};

	constructor() {}

	addEntry(text: string) {
		const totalEntries = Object.keys(this.entries).length;
		this.entries[(totalEntries + 1).toString()] = text;

	}

	deleteEntry(index: string) {
		delete this.entries[index];
	}

	showEntries() {
		const entries = Object.entries(this.entries).map(([key, value]) => `${key}: ${value}`);
		console.log(entries.join('\n'));
	}

}

// NOW IF WE WANT TO SAVE THE JOURNAL IN FILE, WE WILL CREATE NEW CLASS
// THUS ALL THE RESPOSIBILITIES ARE SEPERATED
class PersistenceManager {
	constructor() {}

	saveToFile(journal: Journal, filename: string) {
		writeFileSync(filename, JSON.stringify(journal));
	}

}

const journal = new Journal();
journal.addEntry('Learned new design pattern');
journal.addEntry('Learned SOLID Principles');

journal.showEntries();

const persistenceManager = new PersistenceManager();
// persistenceManager.saveToFile(journal, 'journal.txt');

