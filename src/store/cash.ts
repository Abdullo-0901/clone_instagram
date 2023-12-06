export function providesList(resultsWithIds: { id: number }[], tagType: void) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}
