import { getDb } from '../db';
import { addNode, getTree } from './treeService';
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

  it('should throw if parentId is zero or negative', () => {
    expect(() => addNode(db, 'invalidParent', 0)).toThrow('positive integer');
    expect(() => addNode(db, 'invalidParent', -5)).toThrow('positive integer');
  });

  it('should throw if parentId is not an integer', () => {
    expect(() => addNode(db, 'invalidParent', 3.14)).toThrow('positive integer');
  });

  it('should throw if parentId is not a number', () => {
    expect(() => addNode(db, 'invalidParent', "string" as any)).toThrow('positive integer');
  });

  it('should throw if parentId does not exist', () => {
    expect(() => addNode(db, 'orphan', 888)).toThrow('parentId');
  });

  it('should throw or fail gracefully if label is missing', () => {
    expect(() => addNode(db, '', null)).toThrow();
    expect(() => addNode(db, undefined as any, null)).toThrow();
  });
});
