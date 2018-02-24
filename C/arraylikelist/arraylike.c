#include <stdio.h>
#include <stdlib.h>
#include "arraylike.h"

struct node_s {
  int data;
  int index;
  struct node_s *next;
};

struct list_s {
  node *root;
  int len;
};


void _inc_after(node *nd) {
  while (nd->next) {
    nd = nd->next;
    ++nd->index;
  }
}

void _dec_after(node *nd) {
  while (nd->next) {
    nd = nd->next;
    --nd->index;
  }
}

// Initialize list root
//
//
list *init(int data) {
  list *ls = (list*)malloc(sizeof(list));
  node *nd;
  nd = (node*)malloc(sizeof(node));
  nd->data = data;
  nd->index = 0;
  nd->next = NULL;
  ls->root = nd;
  ls->len = 1;
  return ls;
}

// Push to the end of the list
//
//
void push(list *ls, int data) {
  node *new_node = (node *)malloc(sizeof(node));
  node *tmp = ls->root;
  while (tmp->next) tmp = tmp->next;
  new_node->data = data;
  new_node->index = tmp->index + 1;
  tmp->next = new_node;
  ++ls->len;
}

// Make list from array
//
//
list *from_array(int *arr, int len) {
  list *l = init(arr[0]);
  for (int i = 1; i < len; ++i) push(l, arr[i]);
  return l;
};

// Get list node by index
//
//
node *_get_by_index(list *l, int index) {
  node *tmp = l->root;
  while (tmp->index != index) tmp = tmp->next;
  return tmp;
};


// Insert into list after
// element with appropriate
// index
//
void insert(list *ls, int index, int data) {
  node *tmp, *p,
       *nd = _get_by_index(ls, index);
  p = nd->next;
  tmp = (node*)malloc(sizeof(node));
  nd->next = tmp;
  tmp->index = ++index;
  tmp->next = p;
  tmp->data = data;
  _inc_after(tmp);
  ++ls->len;
}

// Remove node with
// appropriate index
//
void node_remove(list *ls, int index) {
  node *nd = ls->root,
              *tmp, *p;
  while (nd->next->index != index) nd = nd->next;
  p = nd->next->next;
  tmp = nd->next;
  free(tmp);
  --p->index;
  nd->next = p;
  _dec_after(p);
  --ls->len;
}

// Free all nodes from list
//
//
void list_clear(list *ls) {
  node *tmp = ls->root;
  node *next = tmp->next;
  while (next) {
    free(tmp);
    tmp = next;
    next = next->next;
  }
  ls->len = 0;
}

//
//
//
void swap(list *ls, int index1, int index2) {
  node *root = ls->root;
  node *nd1 = _get_by_index(ls, index1);
  node *nd2 = _get_by_index(ls, index2);
  node *prev1, *prev2, *next1, *next2;
  prev1 = root;
  prev2 = root;
  next1 = nd1->next;
  next2 = nd2->next;
  if (prev1 == nd1) prev1 = NULL;
  else while (prev1->next != nd1) prev1 = prev1->next;
  if (prev2 == nd2) prev2 = NULL;
  else while (prev2->next != nd2) prev2 = prev2->next;
  if (nd2 == next1) {
    nd2->next = nd1;
    nd1->next = next2;
    if (nd1 != root) prev1->next = nd2;
  } else if (nd1 == next2) {
    nd1->next = nd2;
    nd2->next = next1;
    if (nd2 != root) prev2->next = nd1;
  } else {
    if (nd1 != root) prev1->next = nd2;
    nd2->next = next1;
    if (nd2 != root) prev2->next = nd1;
    nd1->next = next2;
  }
  nd2->index = index1;
  nd1->index = index2;
  if (nd1 == root) ls->root = nd2;
  if (nd2 == root) ls->root = nd1;
}

// Print list to console
//
//
void print_list(list *ls) {
  node *p = ls->root;
  printf("List <");
  for (int i = 0; i < ls->len; ++i) {
    if (p->next) printf("%d, ", p->data);
    else printf("%d>\n", p->data);
    p = p->next;
  }
  if (ls->len == 0) printf("empty>\n");
}

// Get list length
//
//
int list_len(list *l) {
  return l->len;
}
