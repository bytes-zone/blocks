// src/lib/schema.ts
import { Account, coField, Profile } from 'jazz-tools';

export class MyProfile extends Profile {
	name = coField.string;
	counter = coField.number; // This will be publically visible
}

export class MyAccount extends Account {
	profile = coField.ref(MyProfile);

	// ...
}
