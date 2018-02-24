#include "sort.h"

void swap(int *arr, int i, int j) {
  int k = arr[i];
  arr[i] = arr[j];
  arr[j] = k;
};


void sort(int *instance, int length) {
  for (int i = 0; i < length; ++i) {
    if (instance[i] % 2 == 1) {
      for (int j = i; j > 0; --j) {
        if (
          instance[j - 1] % 2 == 0 || instance[j] < instance[j - 1]
        ) break;
        else swap(instance, j, j - 1);
      }
    } else {
      for (int j = i; j > 0; --j) {
        if (
          instance[j - 1] % 2 == 1 || instance[j] < instance[j - 1]
        ) swap(instance, j, j - 1);
        else break;
      }
    }
  }
};
