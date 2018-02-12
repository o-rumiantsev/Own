#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void sort(int *);

int g_instance_length = 0;

int *read_file(char *input_path) {
  FILE *input;
  int c;
  int i = 0;
  char text[100000];

  input_path[strlen(input_path) - 1] = '\0';
  input = fopen(input_path, "r");

  while ((c = fgetc(input)) != '\n') {
    text[i++] = c;
  }

  text[i] = '\0';
  g_instance_length = atoi(text);
  memset(text, '\0', i);
  i = 0;

  int *instance = (int *)malloc(sizeof(int) * g_instance_length);
  int k = 0;

  do {
    c = fgetc(input);
    if (c != '\n' && c != EOF) text[i++] = c;
    else {
      text[i] = '\0';
      if (strlen(text) > 0) instance[k++] = atoi(text);
      memset(text, '\0', i);
      i = 0;
    }
  } while (c != EOF);
  fclose(input);
  return instance;
}

int main() {
  char input[256];
  fgets(input, 256, stdin);

  int *instance = read_file(input);

  sort(instance);
  for (int i = 0; i < g_instance_length; ++i) printf("%d ", instance[i]);
  printf("\n");
  free(instance);
  return 0;
}

void swap(int *arr, int i, int j) {
  int k = arr[i];
  arr[i] = arr[j];
  arr[j] = k;
};


void sort(int *instance) {
  for (int i = 0; i < g_instance_length - 1; ++i) {
    if (instance[i] % 2 == 1) {
      for (int j = i; j < g_instance_length - 1; ++j) {
        if (
          instance[j + 1] % 2 == 0 || instance[j] < instance[j + 1]
        ) swap(instance, j, j + 1);
        else break;
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
