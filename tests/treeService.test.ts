import { getDb } from '../src/db';
import { addNode, getTree } from '../src/services/treeService';
import Database from 'better-sqlite3';

describe('treeService', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = getDb(':memory:');
  });

  it('should create a root node', () => {
    const id = addNode(db, 'root', null);
    expect(typeof id).toBe('number');
    const tree = getTree(db);
    expect(tree.length).toBe(1);
    expect(tree[0].label).toBe('root');
    expect(tree[0].children).toEqual([]);
  });

  it('should create a child node under a root', () => {
    const rootId = addNode(db, 'rootA', null);
    const childId = addNode(db, 'child', rootId);
    expect(typeof childId).toBe('number');
    const tree = getTree(db);
    expect(tree.length).toBe(1);
    expect(tree[0].label).toBe('rootA');
    expect(tree[0].children.length).toBe(1);
    expect(tree[0].children[0].label).toBe('child');
  });

  it('should build the correct tree structure with multiple nodes', () => {
    const rootId = addNode(db, 'root', null);
    const bearId = addNode(db, 'bear', rootId);
    const catId = addNode(db, 'cat', bearId);
    const frogId = addNode(db, 'frog', rootId);

    const tree = getTree(db);
    expect(tree).toEqual([
      {
        id: rootId,
        label: 'root',
        parentId: null,
        children: [
          {
            id: bearId,
            label: 'bear',
            parentId: rootId,
            children: [
              {
                id: catId,
                label: 'cat',
                parentId: bearId,
                children: [],
              },
            ],
          },
          {
            id: frogId,
            label: 'frog',
            parentId: rootId,
            children: [],
          },
        ],
      },
    ]);
  });

  it('should throw or fail gracefully if label is missing', () => {
    expect(() => addNode(db, '', null)).toThrow();
    expect(() => addNode(db, undefined as any, null)).toThrow();
  });
});
