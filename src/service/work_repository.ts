import { FirebaseApp } from 'firebase/app';
import * as FirebaseDB from 'firebase/database';
import { isWorkDataBase } from '../util/checker';

class WorkRepository {
  private readonly database: FirebaseDB.Database;

  constructor(app: FirebaseApp) {
    this.database = FirebaseDB.getDatabase(app);
  }

  async getAdmins(): Promise<{ [uid: string]: boolean } | null> {
    const query = FirebaseDB.ref(this.database, `admins`);
    const value = (await FirebaseDB.get(query)).val();
    return value;
  }

  syncWorks(onUpdate: (works: WorksDatabase) => void) {
    const query = FirebaseDB.ref(this.database, `works`);
    FirebaseDB.onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }

  async getWorkByTitle(title: string): Promise<WorkData | null> {
    const query = FirebaseDB.ref(this.database, `works`);
    const works = (await FirebaseDB.get(query)).val();
    if (!isWorkDataBase(works)) return null;

    const id = Object.keys(works).find((id) => works[id].title === title);
    const work = id ? works[id] : null;
    return work;
  }

  saveWork(work: WorkData) {
    FirebaseDB.set(FirebaseDB.ref(this.database, `works/${work.id}`), work);
  }

  deleteWork(work: WorkData) {
    FirebaseDB.remove(FirebaseDB.ref(this.database, `works/${work.id}`));
  }
}

export default WorkRepository;
