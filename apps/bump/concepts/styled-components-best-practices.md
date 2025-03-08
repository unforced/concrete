# Styled Components Best Practices

This guide outlines best practices for using styled-components in the Bump project.

## Transient Props

When using props to control styling in styled-components, you should use the transient props pattern to prevent those props from being passed to the DOM. This prevents React DOM warnings about non-standard HTML attributes.

### Problem

When you pass custom props to a styled component, those props are also passed to the underlying HTML element, which can cause React DOM warnings:

```jsx
// This will cause warnings
const StyledButton = styled.button`
  ${props => props.fullWidth && 'width: 100%;'}
`;

<StyledButton fullWidth>Click me</StyledButton>
// Warning: Received `true` for a non-boolean attribute `fullWidth`.
```

### Solution: Transient Props

Use the `$` prefix for props that should only be used for styling:

```jsx
// This won't cause warnings
const StyledButton = styled.button`
  ${props => props.$fullWidth && 'width: 100%;'}
`;

// In your component
const Button = ({ fullWidth, ...props }) => (
  <StyledButton $fullWidth={fullWidth} {...props}>
    Click me
  </StyledButton>
);
```

### Implementation Example

Here's how we implement transient props in our components:

```tsx
// Component props interface
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: boolean;
  clickable?: boolean;
}

// Styled component with transient props
const StyledCard = styled.div<{ 
  $padding?: boolean; 
  $clickable?: boolean; 
  variant?: string 
}>`
  /* Styles that use the transient props */
  ${({ $padding, theme }) =>
    $padding &&
    css`
      padding: ${theme.space[3]}px;
    `}
    
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}
`;

// Component implementation
const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = true,
  clickable = false,
  ...props
}) => {
  return (
    <StyledCard 
      variant={variant} 
      $padding={padding} 
      $clickable={clickable} 
      {...props}
    >
      {children}
    </StyledCard>
  );
};
```

## Other Best Practices

### 1. Use Theme Values

Always use theme values for styling to maintain consistency:

```jsx
// Good
padding: ${({ theme }) => theme.space[2]}px;

// Avoid
padding: 8px;
```

### 2. Organize Styles Logically

Group related styles together and use comments to separate sections:

```jsx
const StyledButton = styled.button`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  
  /* Size variations */
  ${({ size }) => /* ... */}
  
  /* Variant styles */
  ${({ variant }) => /* ... */}
  
  /* State styles */
  &:hover { /* ... */ }
  &:disabled { /* ... */ }
`;
```

### 3. Use CSS Helper for Complex Styles

Use the `css` helper for complex style blocks, especially when using props:

```jsx
${({ $fullWidth }) =>
  $fullWidth &&
  css`
    width: 100%;
    max-width: none;
  `}
```

### 4. Component Composition

Break down complex components into smaller styled components:

```jsx
const InputContainer = styled.div`/* ... */`;
const Label = styled.label`/* ... */`;
const StyledInput = styled.input`/* ... */`;
const ErrorMessage = styled.span`/* ... */`;

const Input = ({ label, error, ...props }) => (
  <InputContainer>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </InputContainer>
);
```

### 5. Testing Styled Components

When testing styled components, focus on behavior and key style properties rather than exact CSS values:

```jsx
// Test presence of style property
expect(element).toHaveStyle('cursor: pointer');

// For colors, test for presence rather than exact values
expect(element).toHaveStyle(`border: 1px solid ${theme.colors.primary}`);
``` 