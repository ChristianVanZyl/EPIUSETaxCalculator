import { BaseStep } from "../commands/baseStep.js"

// composite pattern is used to execute a method shared by all of the command classes
// circumventing the need to call the method for each step separately
export class Steps extends BaseStep {
    constructor(nameof, description, ...commandSteps) {
        super(nameof, description)
        this.commandSteps = commandSteps
    }

    execute(payRollData) {
        this.commandSteps.forEach(commandStep => {
            commandStep.execute(payRollData)
        })
        return payRollData
    }

    accept(visitor) {
        visitor.enter_steps(this);
        for (let commandSteps of this.commandSteps) {
            commandSteps.accept(visitor);
        }
        visitor.exit_steps(this);
        return visitor
    }
}

export class If extends BaseStep {
    constructor(val1, operator, val2, branchTrue, branchFalse) {
        super()
        this.val1 = val1
        this.operator = operator
        this.val2 = val2
        this.branchTrue = branchTrue
        this.branchFalse = branchFalse

    }

    execute(payRollData) {
        const val1 = payRollData.get(this.val1).value
        const val2 = payRollData.get(this.val2).value
        let result = null

        switch (this.operator) {
            case "==": result = val1 == val2
                break
            case ">=": result = val1 >= val2
                break
            case ">": result = val1 > val2
                break
            case "<=": result = val1 <= val2
                break
            case "<": result = val1 < val2
                break
            case "!=": result = val1 != val2
                break
            default: if (this.operator) throw "Operator does not match, please use relational operators";
                break
        }

        const branch = result ? this.branchTrue : this.branchFalse

        branch.execute(payRollData)

        return payRollData
    }

    accept(visitor) {

        visitor.enter_branchtrue(this);
        this.branchTrue.accept(visitor);
        visitor.exit_branchtrue(this)

        visitor.enter_branchfalse(this);
        this.branchFalse.accept(visitor);
        visitor.exit_branchfalse(this)

        return visitor
    }

}

