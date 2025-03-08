# Generation Mechanism

This guide explains the generation mechanism used in the Concrete templating system.

## Overview

The generation mechanism is the core process by which Concrete transforms templates into fully-realized projects. Unlike traditional templating systems that simply copy and replace variables, Concrete uses AI-powered generation to create intelligent, context-aware implementations based on high-level instructions.

The generation mechanism follows these principles:

1. **Instruction-driven**: Generation is guided by natural language instructions
2. **Context-aware**: Generation takes into account the entire project context
3. **Consistent**: Generated code follows consistent patterns and practices
4. **Customizable**: Generation can be influenced by customization points
5. **Transparent**: The generation process is transparent and explainable

## Generation Process

The generation process involves several steps:

1. **Template Selection**: The user selects a template that matches their project needs
2. **Customization**: The user configures customization points to tailor the template
3. **Instruction Processing**: The system processes generation instructions from the template
4. **Context Building**: The system builds a context model of the project
5. **Code Generation**: AI generates code based on instructions and context
6. **Validation**: Generated code is validated for correctness and consistency
7. **Integration**: Generated code is integrated into the project structure

## Generation Instructions

Generation instructions are natural language descriptions that guide the AI in generating code. They are stored in the `generation/` directory of a template and are organized by component type.

Example of a generation instruction for a React component:

```markdown
# React Component Generation

## Overview

This guide provides instructions for generating React components based on the project's requirements and customization points.

## Component Structure

Generate React components with the following structure:

1. Imports
2. Type definitions (if using TypeScript)
3. Component function
4. Props destructuring
5. State and effects
6. Helper functions
7. Return statement with JSX
8. Export statement

## Naming Conventions

- Component files should be named using PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Component functions should match the file name
- Props interfaces should be named `{ComponentName}Props`

## Styling Approach

Use the styling approach specified in the `styling` customization point:

- If `styling` is "styled-components", use styled-components for styling
- If `styling` is "tailwind", use Tailwind CSS classes
- If `styling` is "css-modules", use CSS modules

## State Management

Use the state management approach specified in the `state_management` customization point:

- If `state_management` is "context", use React Context API
- If `state_management` is "redux", use Redux
- If `state_management` is "zustand", use Zustand

## Error Handling

Include appropriate error handling in components:

- Use try/catch blocks for error-prone operations
- Display user-friendly error messages
- Log errors for debugging

## Accessibility

Ensure components are accessible:

- Use semantic HTML elements
- Include ARIA attributes where appropriate
- Ensure keyboard navigation works
- Maintain sufficient color contrast

## Example Component

Here's an example of a Button component:

```jsx
// Button.tsx
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const StyledButton = styled.button<{ variant: string; size: string }>`
  border-radius: 4px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  /* Variant styles */
  ${props => props.variant === 'primary' && `
    background-color: #3182ce;
    color: white;
    border: none;
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: white;
    color: #3182ce;
    border: 1px solid #3182ce;
  `}
  
  ${props => props.variant === 'tertiary' && `
    background-color: transparent;
    color: #3182ce;
    border: none;
  `}
  
  /* Size styles */
  ${props => props.size === 'small' && `
    padding: 8px 16px;
    font-size: 14px;
  `}
  
  ${props => props.size === 'medium' && `
    padding: 12px 20px;
    font-size: 16px;
  `}
  
  ${props => props.size === 'large' && `
    padding: 16px 24px;
    font-size: 18px;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
```
```

## Generation Context

The generation context includes:

1. **Template Information**: Metadata about the template
2. **Customization Values**: Values of customization points
3. **Project Structure**: Current structure of the project
4. **Dependencies**: Project dependencies and their versions
5. **User Preferences**: User-specific preferences
6. **Best Practices**: Industry best practices for the technology stack

## Generation Strategies

Concrete uses different generation strategies depending on the component type:

### 1. Template-Based Generation

For simple components with minimal logic, Concrete uses template-based generation:

```javascript
// Template
const {{componentName}} = (props) => {
  return (
    <div className="{{className}}">
      {{content}}
    </div>
  );
};

// Generated
const Header = (props) => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <nav>{props.children}</nav>
    </div>
  );
};
```

### 2. Instruction-Based Generation

For complex components with specific requirements, Concrete uses instruction-based generation:

```markdown
Generate a form component with the following fields:
- Email (with validation)
- Password (with strength indicator)
- Submit button

The form should handle validation and submission.
```

### 3. Example-Based Generation

For components that should follow a specific pattern, Concrete uses example-based generation:

```markdown
Generate a component similar to the following example, but for a user profile instead of a product:

```jsx
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};
```
```

## Generation Hooks

Templates can define generation hooks to customize the generation process:

### Pre-Generation Hooks

Pre-generation hooks run before code generation:

```javascript
// pre-generate.js
module.exports = (context) => {
  // Modify context before generation
  context.customization.styling = context.customization.styling || 'styled-components';
  return context;
};
```

### Post-Generation Hooks

Post-generation hooks run after code generation:

```javascript
// post-generate.js
module.exports = (generatedFiles) => {
  // Modify generated files
  for (const file of generatedFiles) {
    if (file.path.endsWith('.jsx')) {
      file.content = file.content.replace(/var /g, 'const ');
    }
  }
  return generatedFiles;
};
```

## Generation Configuration

Templates can configure the generation process in the `concrete.yaml` file:

```yaml
generation:
  # AI model to use for generation
  model: "gpt-4"
  
  # Temperature for generation (0.0 - 1.0)
  temperature: 0.7
  
  # Maximum tokens for generation
  max_tokens: 2048
  
  # Whether to use cached generations
  use_cache: true
  
  # Directories to exclude from context
  exclude_from_context:
    - "node_modules"
    - "dist"
    - ".git"
  
  # Files to include in context
  include_in_context:
    - "src/**/*.{js,jsx,ts,tsx}"
    - "package.json"
    - "README.md"
```

## Generation Modes

Concrete supports different generation modes:

### 1. Full Generation

Generates the entire project from scratch:

```bash
concrete generate --mode=full
```

### 2. Incremental Generation

Generates only new or modified components:

```bash
concrete generate --mode=incremental
```

### 3. Selective Generation

Generates specific components:

```bash
concrete generate --mode=selective --components=auth,profile,settings
```

## Generation Feedback

Concrete collects feedback on generated code to improve future generations:

```bash
concrete feedback --component=auth --rating=4 --comment="Good implementation, but missing error handling"
```

## Best Practices

### For Template Authors

1. **Be Specific**: Provide detailed generation instructions
2. **Include Examples**: Include examples of expected output
3. **Define Patterns**: Define consistent patterns for generated code
4. **Consider Edge Cases**: Address edge cases in generation instructions
5. **Test Generation**: Test generation with different customization values
6. **Document Assumptions**: Document assumptions made in generation instructions
7. **Provide Fallbacks**: Provide fallbacks for when generation fails
8. **Update Instructions**: Update instructions based on feedback

### For Template Users

1. **Review Generated Code**: Always review generated code before using it
2. **Provide Feedback**: Provide feedback on generated code
3. **Customize Instructions**: Customize generation instructions for specific needs
4. **Regenerate When Needed**: Regenerate components when requirements change
5. **Understand Limitations**: Understand the limitations of AI-generated code

## Troubleshooting

### Common Issues

1. **Inconsistent Generation**: Generation produces inconsistent results
   - Solution: Increase specificity in generation instructions
   
2. **Missing Context**: Generation doesn't take into account project context
   - Solution: Ensure relevant files are included in the generation context
   
3. **Generation Errors**: Generation fails with errors
   - Solution: Check generation logs and adjust instructions or context

### Debugging Generation

To debug generation issues:

```bash
concrete generate --debug
```

This will output detailed information about the generation process, including:

1. Context used for generation
2. Instructions processed
3. Generation steps
4. Error messages

## Advanced Concepts

### Multi-Stage Generation

For complex components, Concrete uses multi-stage generation:

1. **Planning**: Generate a plan for the component
2. **Implementation**: Generate the implementation based on the plan
3. **Testing**: Generate tests for the component
4. **Documentation**: Generate documentation for the component

### Adaptive Generation

Concrete adapts generation based on project evolution:

1. **Learning**: Learn from existing code in the project
2. **Adaptation**: Adapt generation to match project patterns
3. **Consistency**: Ensure consistency with existing code

### Collaborative Generation

Concrete supports collaborative generation:

1. **Human-in-the-loop**: Allow humans to guide the generation process
2. **Feedback Integration**: Integrate feedback into future generations
3. **Iterative Refinement**: Refine generated code based on feedback

## Conclusion

The generation mechanism is what sets Concrete apart from traditional templating systems. By using AI-powered generation, Concrete can create intelligent, context-aware implementations that adapt to specific project needs. This enables developers to focus on high-level design decisions while the system handles the implementation details. 