import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  boardId!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
  }

}
