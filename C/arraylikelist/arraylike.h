#ifndef arraylike_h
#define arraylike_h

typedef struct node_s node;
typedef struct list_s list;

list *init(int);
list *from_array(int *, int);
void push(list *, int);
void insert(list *, int, int);
void node_remove(list *, int);
void swap(list *, int, int);
void list_clear(list *);
void print_list(list *);
int list_len(list *);

#endif
