import { co, Group } from 'jazz-tools';
import { Task } from './task';
import { Area } from './area';
import { Profile } from './profile';

export const Root = co.map({
  inbox: co.list(Task),
  areas: co.list(Area),
});

export const Account = co
  .account({
    profile: Profile,
    root: Root,
  })
  .withMigration((account) => {
    if (account.root === undefined) {
      const group = Group.create();

      account.$jazz.set("root", Root.create(
                {
                  inbox: [],
                  areas: [],
                },
                group,
              ));
    }

    if (account.root && account.root.areas === undefined) {
      const group = Group.create();
      group.addMember(account.root.$jazz.owner, 'admin');

      account.root.$jazz.set("areas", Root.shape.areas.create([], group));
    }

    if (!account.profile) {
      const group = Group.create();
      group.addMember('everyone', 'reader');

      account.$jazz.set("profile", Profile.create(
                {
                  name: '',
                },
                group,
              ));
    }
  });
