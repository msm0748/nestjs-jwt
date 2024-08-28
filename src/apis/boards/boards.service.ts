import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  getBoards() {
    return [
      { id: 1, title: '게시글 1' },
      { id: 2, title: '게시글 2' },
    ];
  }
}
