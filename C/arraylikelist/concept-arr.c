#include <stdio.h>
#include "arraylike.h"

int f(int);

int main() {
  int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
  int len = sizeof(a) / sizeof(int);
  list *l = from_array(a, len);
  print_list(l);

  list *ls = slice(l, 12, 7);
  print_list(ls);
}

int f(int item) {
  return item * 10;
}
