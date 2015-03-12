/******************************************************************************
 * Creature Runtimes License
 * 
 * Copyright (c) 2015, Kestrel Moon Studios
 * All rights reserved.
 * 
 * Preamble: This Agreement governs the relationship between Licensee and Kestrel Moon Studios(Hereinafter: Licensor).
 * This Agreement sets the terms, rights, restrictions and obligations on using [Creature Runtimes] (hereinafter: The Software) created and owned by Licensor,
 * as detailed herein:
 * License Grant: Licensor hereby grants Licensee a Sublicensable, Non-assignable & non-transferable, Commercial, Royalty free,
 * Including the rights to create but not distribute derivative works, Non-exclusive license, all with accordance with the terms set forth and
 * other legal restrictions set forth in 3rd party software used while running Software.
 * Limited: Licensee may use Software for the purpose of:
 * Running Software on Licensee’s Website[s] and Server[s];
 * Allowing 3rd Parties to run Software on Licensee’s Website[s] and Server[s];
 * Publishing Software’s output to Licensee and 3rd Parties;
 * Distribute verbatim copies of Software’s output (including compiled binaries);
 * Modify Software to suit Licensee’s needs and specifications.
 * Binary Restricted: Licensee may sublicense Software as a part of a larger work containing more than Software,
 * distributed solely in Object or Binary form under a personal, non-sublicensable, limited license. Such redistribution shall be limited to unlimited codebases.
 * Non Assignable & Non-Transferable: Licensee may not assign or transfer his rights and duties under this license.
 * Commercial, Royalty Free: Licensee may use Software for any purpose, including paid-services, without any royalties
 * Including the Right to Create Derivative Works: Licensee may create derivative works based on Software, 
 * including amending Software’s source code, modifying it, integrating it into a larger work or removing portions of Software, 
 * as long as no distribution of the derivative works is made
 * 
 * THE RUNTIMES IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE RUNTIMES OR THE USE OR OTHER DEALINGS IN THE
 * RUNTIMES.
 *****************************************************************************/

function CreatureRenderer(name, scene, manager_in, texture_in)
{
	this.creature_manager = manager_in;
	this.texture = texture_in;
	this.scene = scene;
	this.name = name;
	this.normals = [];
	
	this.renderMesh = null; 
};


CreatureRenderer.prototype.UpdateData = function()
{
	var target_creature = this.creature_manager.target_creature;
	
	if(this.renderMesh == null)
	{
		this.renderMesh = new BABYLON.Mesh(this.name, this.scene);
		this.renderMesh.setIndices(target_creature.global_indices);
		this.renderMesh.material = this.texture;
		this.renderMesh.scaling = new BABYLON.Vector3(1, 1, 1);
		
		var nIndex = 0;
		this.normals = [];
		for(var i = 0; i < target_creature.total_num_pts; i++)
		{
			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(-1);
			
			nIndex += 3;
		}
	}
	
	var read_pts = target_creature.render_pts;
//	var read_pts = target_creature.global_pts;
	var read_uvs = target_creature.global_uvs;
	var read_colours = target_creature.render_colours;
	
	this.renderMesh.setVerticesData(read_pts, BABYLON.VertexBuffer.PositionKind, true);
	this.renderMesh.setVerticesData(read_uvs, BABYLON.VertexBuffer.UVKind, true);
	this.renderMesh.setVerticesData(read_colours, BABYLON.VertexBuffer.ColorKind, true);
	this.renderMesh.setVerticesData(this.normals, BABYLON.VertexBuffer.NormalKind, true);
};
