import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // In a real implementation, we would generate or retrieve the file
    // For now, we'll create a simple JSON response
    
    let content = '';
    let contentType = '';
    
    if (filename === 'concrete-structure.json') {
      // Sample JSON structure
      const jsonContent = {
        name: '.concrete',
        type: 'directory',
        children: [
          {
            name: 'system.md',
            type: 'file',
            content: '# Concrete System'
          },
          {
            name: 'milestones',
            type: 'directory',
            children: []
          }
        ]
      };
      
      content = JSON.stringify(jsonContent, null, 2);
      contentType = 'application/json';
    } else if (filename === 'concrete-structure.zip') {
      // In a real implementation, we would generate a ZIP file
      // For now, we'll return a placeholder message
      content = 'This would be a ZIP file in a real implementation';
      contentType = 'text/plain';
    } else {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Create response with appropriate headers
    const response = new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
    
    return response;
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
} 