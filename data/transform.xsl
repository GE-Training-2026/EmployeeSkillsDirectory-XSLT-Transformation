<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <div class="employee-grid">
            <xsl:for-each select="registry/employee">
                <div class="employee-card" data-department="{department}" data-name="{translate(name, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}">
                    
                    <div class="card-header">
                        <div class="name-badge">
                            <h2 class="employee-name"><xsl:value-of select="name"/></h2>
                            <xsl:if test="@isMentor='true'">
                                <span class="badge mentor-badge">Mentor</span>
                            </xsl:if>
                        </div>
                        <p class="employee-role"><xsl:value-of select="role"/></p>
                        <p class="employee-dept"><xsl:value-of select="department"/></p>
                    </div>

                    <div class="card-body">
                        <p class="employee-email">✉ <xsl:value-of select="email"/></p>
                        <div class="skills-container">
                            <strong>Skills: </strong>
                            <xsl:for-each select="skills/skill">
                                <span class="skill-tag"><xsl:value-of select="."/></span>
                            </xsl:for-each>
                        </div>
                    </div>

                </div>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>