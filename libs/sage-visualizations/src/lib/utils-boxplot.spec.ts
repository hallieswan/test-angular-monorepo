import {
  CategoryAsValuePoint,
  CategoryBoxplotSummary,
  CategoryPoint,
} from './models';
import { CategoryAsValueBoxplotSummary } from './models/boxplot';
import {
  addXAxisValueToBoxplotSummaries,
  addXAxisValueToCategoryPoint,
  formatCategoryPointsForBoxplotTransform,
  getJitteredXValue,
  getPointStyleFromArray,
  getSortedUniqueValues,
} from './utils-boxplot';

const pointsWithPointCategories: CategoryPoint[] = [
  { xAxisCategory: 'c', pointCategory: 'Y', value: 1 },
  { xAxisCategory: 'c', pointCategory: 'X', value: 2 },
  { xAxisCategory: 'c', pointCategory: 'Z', value: 3 },
  { xAxisCategory: 'a', pointCategory: 'Y', value: 4 },
  { xAxisCategory: 'a', pointCategory: 'X', value: 5 },
  { xAxisCategory: 'a', pointCategory: 'Z', value: 6 },
  { xAxisCategory: 'b', pointCategory: 'Y', value: 7 },
  { xAxisCategory: 'b', pointCategory: 'X', value: 8 },
  { xAxisCategory: 'b', pointCategory: 'Z', value: 9 },
];

const pointsWithoutPointCategories: CategoryPoint[] = [
  { xAxisCategory: 'c', value: 3 },
  { xAxisCategory: 'a', value: 1 },
  { xAxisCategory: 'b', value: 2 },
];

describe('utils-boxplot', () => {
  describe('getPointStyleFromArray', () => {
    const pointCategories = ['a', 'b', 'c'];
    const pt = { xAxisCategory: 'first', value: 1, pointCategory: 'a' };
    const shapes = ['circle', 'triangle'];
    const styleType = 'shape';
    const notFoundValue = 'none';

    it('should handle valid point categories', () => {
      expect(
        getPointStyleFromArray(
          pt,
          pointCategories,
          shapes,
          styleType,
          notFoundValue
        )
      ).toEqual('circle');
      expect(
        getPointStyleFromArray(
          { ...pt, pointCategory: 'b' },
          pointCategories,
          shapes,
          styleType,
          notFoundValue
        )
      ).toEqual('triangle');
    });

    it('should reuse values if there are more categories than values', () => {
      expect(
        getPointStyleFromArray(
          { ...pt, pointCategory: 'c' },
          pointCategories,
          shapes,
          'shape',
          'none'
        )
      ).toEqual('circle');
    });

    it('should return notFoundValue if category is not found', () => {
      expect(
        getPointStyleFromArray(
          { ...pt, pointCategory: 'd' },
          pointCategories,
          shapes,
          styleType,
          notFoundValue
        )
      ).toEqual(notFoundValue);
    });
  });

  describe('getSortedUniqueValues', () => {
    it('should return sorted, unique values', () => {
      expect(
        getSortedUniqueValues(pointsWithPointCategories, 'xAxisCategory')
      ).toEqual(['a', 'b', 'c']);

      expect(
        getSortedUniqueValues(pointsWithPointCategories, 'pointCategory')
      ).toEqual(['X', 'Y', 'Z']);
    });

    it('should handle all undefined values', () => {
      expect(
        getSortedUniqueValues(pointsWithoutPointCategories, 'pointCategory')
      ).toEqual([]);
    });
  });

  describe('getJitteredXValue', () => {
    it('1 point', () => {
      expect(getJitteredXValue(2, 0, 1)).toEqual(2);
    });

    it('2 points', () => {
      expect(getJitteredXValue(2, 0, 2)).toEqual(1.9);
      expect(getJitteredXValue(2, 1, 2)).toEqual(2.1);
    });

    it('3 points', () => {
      expect(getJitteredXValue(2, 0, 3)).toEqual(1.8);
      expect(getJitteredXValue(2, 1, 3)).toEqual(2);
      expect(getJitteredXValue(2, 2, 3)).toEqual(2.2);
    });

    it('4 points', () => {
      expect(getJitteredXValue(2, 0, 4)).toEqual(1.7);
      expect(getJitteredXValue(2, 1, 4)).toEqual(1.9);
      expect(getJitteredXValue(2, 2, 4)).toEqual(2.1);
      expect(getJitteredXValue(2, 3, 4)).toEqual(2.3);
    });

    it('prevents overlap with next category when there are more subcategories than can be spaced using default spacing', () => {
      expect(getJitteredXValue(2, 0, 6)).toEqual(1.55);
      expect(getJitteredXValue(2, 5, 6)).toEqual(2.45);
    });
  });

  describe('addXAxisValueToCategoryPoint', () => {
    it('handles points without pointCategory values', () => {
      const valuePoints: CategoryAsValuePoint[] = [
        { xAxisCategory: 'c', value: 3, xAxisValue: 3 },
        { xAxisCategory: 'a', value: 1, xAxisValue: 1 },
        { xAxisCategory: 'b', value: 2, xAxisValue: 2 },
      ];
      expect(
        addXAxisValueToCategoryPoint(
          pointsWithoutPointCategories,
          ['a', 'b', 'c'],
          []
        )
      ).toEqual(valuePoints);
    });

    it('handles multiple points per pointCategory', () => {
      const valuePoints: CategoryAsValuePoint[] = [
        { xAxisCategory: 'c', pointCategory: 'Y', value: 1, xAxisValue: 3 },
        { xAxisCategory: 'c', pointCategory: 'X', value: 2, xAxisValue: 2.8 },
        { xAxisCategory: 'c', pointCategory: 'Z', value: 3, xAxisValue: 3.2 },
        { xAxisCategory: 'a', pointCategory: 'Y', value: 4, xAxisValue: 1 },
        { xAxisCategory: 'a', pointCategory: 'X', value: 5, xAxisValue: 0.8 },
        { xAxisCategory: 'a', pointCategory: 'Z', value: 6, xAxisValue: 1.2 },
        { xAxisCategory: 'b', pointCategory: 'Y', value: 7, xAxisValue: 2 },
        { xAxisCategory: 'b', pointCategory: 'X', value: 8, xAxisValue: 1.8 },
        { xAxisCategory: 'b', pointCategory: 'Z', value: 9, xAxisValue: 2.2 },
      ];
      expect(
        addXAxisValueToCategoryPoint(
          pointsWithPointCategories,
          ['a', 'b', 'c'],
          ['X', 'Y', 'Z']
        )
      ).toEqual(valuePoints);
    });
  });

  describe('addXAxisValueToBoxplotSummaries', () => {
    it('correctly maps xAxisCategory to xAxisValue', () => {
      const input: CategoryBoxplotSummary[] = [
        {
          xAxisCategory: 'c',
          min: 10,
          firstQuartile: 20,
          median: 30,
          thirdQuartile: 40,
          max: 50,
        },
        {
          xAxisCategory: 'a',
          min: 15,
          firstQuartile: 25,
          median: 35,
          thirdQuartile: 45,
          max: 55,
        },
        {
          xAxisCategory: 'b',
          min: 20,
          firstQuartile: 30,
          median: 40,
          thirdQuartile: 50,
          max: 60,
        },
      ];
      const output: CategoryAsValueBoxplotSummary[] = [
        {
          xAxisCategory: 'c',
          min: 10,
          firstQuartile: 20,
          median: 30,
          thirdQuartile: 40,
          max: 50,
          xAxisValue: 3,
        },
        {
          xAxisCategory: 'a',
          min: 15,
          firstQuartile: 25,
          median: 35,
          thirdQuartile: 45,
          max: 55,
          xAxisValue: 1,
        },
        {
          xAxisCategory: 'b',
          min: 20,
          firstQuartile: 30,
          median: 40,
          thirdQuartile: 50,
          max: 60,
          xAxisValue: 2,
        },
      ];

      expect(addXAxisValueToBoxplotSummaries(input, ['a', 'b', 'c'])).toEqual(
        output
      );
    });
  });

  describe('formatCategoryPointsForBoxplotTransform', () => {
    it('correctly restructures data', () => {
      const ptsBoxplotTransform = [[], [1], [2], [3]];
      expect(
        formatCategoryPointsForBoxplotTransform(pointsWithoutPointCategories, [
          'a',
          'b',
          'c',
        ])
      ).toEqual(ptsBoxplotTransform);
    });

    it('ignores point categories', () => {
      const ptsBoxplotTransform = [[], [4, 5, 6], [7, 8, 9], [1, 2, 3]];
      expect(
        formatCategoryPointsForBoxplotTransform(pointsWithPointCategories, [
          'a',
          'b',
          'c',
        ])
      ).toEqual(ptsBoxplotTransform);
    });
  });
});
