import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
	standalone: true,
	selector: 'app-side-menu',
	imports: [CommonModule, FormsModule],
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
	userAsked: string = '';
	questions: string[] = [];
	questionMaxLength = 300;

	send(questionForm: NgForm) {
		this.questions.push(this.userAsked);
		questionForm.reset();
		this.userAsked = '';
	}
}
